package com.ims.server.itemAction;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.ims.server.item.Item;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class ItemAction {
	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private final BigDecimal price;

	@Column(nullable = false)
	private final Long quantity;

	@JsonIgnore
	@CreatedDate
	private LocalDateTime createdDate;

	@JsonIgnore
	@LastModifiedDate
	private LocalDateTime lastModifiedDate;

	@ManyToOne
	@JoinColumn(nullable = false)
	private Item item;

	ItemAction() {
		this.price = BigDecimal.valueOf(0);
		this.quantity = 0L;
	}
}
